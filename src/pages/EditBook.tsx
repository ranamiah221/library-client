import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditBookMutation, useGetAllBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const EditBook = ({ bookId, onClose }) => {
    const { data } = useGetAllBooksQuery(undefined)
    const [editBook, ] = useEditBookMutation()
    const findBook = data.data.find(book => book._id === bookId) || {};
    const { _id, title, author, description, isbn, copies } = findBook;
    const [open, setOpen] = useState(false);
    const form = useForm()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const bookData = {
            ...data,
            available: true,
        }
        const res = await editBook({ id: _id, data: bookData })
        if (res) {
            Swal.fire({
                title: "Updated Successfully",
                icon: "success",
                draggable: true
            });
            setOpen(false)

        }


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline"><FaEdit className="text-base text-green-600" /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Book</DialogTitle>
                    </DialogHeader>

                    <Form {...form} >
                        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex justify-between items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={title} placeholder={title} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="author"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={author} placeholder={author} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <FormField
                                    control={form.control}
                                    name="isbn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ISBN</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={isbn} placeholder={isbn} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="copies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Copies</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={copies} placeholder={copies} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>


                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} defaultValue={description} placeholder={description} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="FICTION">FICTION</SelectItem>
                                                <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                                                <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                                                <SelectItem value="HISTORY">HISTORY</SelectItem>
                                                <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                                                <SelectItem value="FANTASY">FANTASY</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="mt-5 bg-green-500" type="submit">Update Book</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditBook;