'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import user_requests from '@/shared/config/api/user/user.requests';
import { User, ImageIcon } from 'lucide-react';
import { UserBodyModels } from '@/shared/config/api/user/user.models';
import { Loading } from '@/shared/ui/loading';
import { UPLOAD_BASE_URL } from '@/shared/config/api/URLs';

interface EditProfileDialogProps {
  user: Partial<UserBodyModels> & {
    id?: number;
    email: string;
    username: string;
    about?: string;
    imageUrl?: string;
    coverImage?: string;
  };
  children: React.ReactNode;
}

export function EditProfileDialog({ user, children }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    about: user?.about || '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [coverPreview, setCoverPreview] = useState<string>('');

  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage);
      setProfilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setProfilePreview('');
    }
  }, [profileImage]);

  useEffect(() => {
    if (coverImage) {
      const objectUrl = URL.createObjectURL(coverImage);
      setCoverPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setCoverPreview('');
    }
  }, [coverImage]);

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, []);
  const queryClient = useQueryClient();

  const updateProfile = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();

      if (formData.username)
        formDataToSend.append('username', formData.username);
      if (formData.about) formDataToSend.append('about', formData.about);
      if (profileImage) formDataToSend.append('profileImage', profileImage);
      if (coverImage) formDataToSend.append('coverImage', coverImage);

      return user_requests.updateProfile(user.id!, formDataToSend);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] });
      setOpen(false);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate();
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'cover',
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'profile') {
        setProfileImage(file);
      } else {
        setCoverImage(file);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Malumotlarni o'zgartirish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <Input value={user.email} disabled className="opacity-70" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Username</label>
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
              placeholder="Bizga o'zingiz haqingizda aytib bering"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Profil rasm</label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-input">
                {profilePreview ? (
                  <img
                    src={profilePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : user?.imageUrl ? (
                  <img
                    src={UPLOAD_BASE_URL + user.imageUrl}
                    alt="Current profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'profile')}
                  className="hidden"
                />
                <label
                  htmlFor="profile-upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                >
                  {profilePreview ? "O'zgartirish" : 'Rasm tanlash'}
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Qopqoq rasm</label>
            <div className="space-y-2">
              <div className="relative h-32 rounded-md overflow-hidden border border-input">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : user?.coverImage ? (
                  <img
                    src={UPLOAD_BASE_URL + user.coverImage}
                    alt="Current cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Qopqoq rasmi yo'q
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'cover')}
                  className="hidden"
                />
                <label
                  htmlFor="cover-upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                >
                  {coverPreview ? "O'zgartirish" : 'Rasm tanlash'}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={updateProfile.isPending}
            >
              Bekor qilish
            </Button>
            <Button type="submit" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? (
                <Loading variant={'primary'} />
              ) : (
                'Saqlash'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
