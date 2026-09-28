import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, UploadCloud, User, Mail, Phone, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '@/redux/authslice';

import { showSuccessAlert, showErrorAlert } from '@/utils/swal';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null,
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const baseUrl = import.meta.env.VITE_BASE_ORIGIN_URL || '';
            const res = await axios.post(
                `${baseUrl}/api/v1/user/profile/update`, 
                formData, 
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                showSuccessAlert("Profile Updated!", "Your resume and profile information have been saved.");
                toast.success(res.data.message || "Profile updated successfully!");
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            const errMsg = error.response?.data?.message || "Failed to update profile";
            showErrorAlert("Update Failed", errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg p-6 rounded-3xl" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-slate-900">Update Your Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="fullname" className="text-xs font-semibold text-slate-700">Full Name</Label>
                        <Input
                            id="fullname"
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            className="rounded-xl"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="rounded-xl"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phoneNumber" className="text-xs font-semibold text-slate-700">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="rounded-xl"
                                placeholder="9876543210"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="bio" className="text-xs font-semibold text-slate-700">Professional Bio</Label>
                        <Input
                            id="bio"
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="rounded-xl"
                            placeholder="Fullstack Web Developer with 2+ years experience..."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="skills" className="text-xs font-semibold text-slate-700">
                            Skills <span className="text-slate-400 font-normal">(Comma separated)</span>
                        </Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            className="rounded-xl"
                            placeholder="React, Node.js, TypeScript, Tailwind CSS"
                        />
                    </div>

                    <div className="space-y-1.5 pt-1">
                        <Label htmlFor="file" className="text-xs font-semibold text-slate-700">Upload New Resume (PDF)</Label>
                        <Input
                            id="file"
                            name="file"
                            type="file"
                            accept="application/pdf"
                            onChange={fileChangeHandler}
                            className="rounded-xl cursor-pointer file:rounded-lg file:bg-indigo-50 file:text-indigo-700 file:border-0 file:font-semibold file:text-xs"
                        />
                        {user?.profile?.resumeoriginalname && (
                            <p className="text-xs text-slate-400 mt-1">
                                Current file: <span className="text-indigo-600 font-medium">{user.profile.resumeoriginalname}</span>
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-3">
                        <Button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Changes...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;