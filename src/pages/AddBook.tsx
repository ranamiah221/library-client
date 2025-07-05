import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddBookMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddBook = () => {
    const [open, setOpen] = useState(false);
    const [addBook] = useAddBookMutation();
    const navigate = useNavigate();

    const form = useForm()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const bookData = {
            ...data,
            author: data.author.trim(),
            isbn: data.isbn.trim(),
            description: data.description.trim(),
            copies: parseInt(data.copies),
            available: true,
        }
        console.log(bookData);
        const res = await addBook(bookData);
        if (res) {
            setOpen(false)
            form.reset()
            Swal.fire({
                title: "Book added successfully",
                icon: "success",
                draggable: true
            });
          navigate('/books')
        }


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button className="bg-green-600 text-white rounded-lg" >Add Book</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
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
                                                <Input {...field} value={field.value || ""} required />
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
                                                <Input {...field} value={field.value || ""} required />
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
                                                <Input {...field} value={field.value || ""} required />
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
                                                <Input {...field} value={field.value || ""} required/>
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
                                            <Textarea {...field} value={field.value || ""} required/>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
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
                                <Button className="mt-5 bg-green-500" type="submit">Add Book</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AddBook;