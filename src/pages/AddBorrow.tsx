import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useCreateBorrowMutation, useGetAllBooksQuery } from "@/redux/api/baseApi";
import { formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { MdBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddBorrow = ({ bookId, onClose }: IProps) => {
    const { data } = useGetAllBooksQuery(undefined);
    const [createBorrow] = useCreateBorrowMutation();
    const findBook = data?.data?.find(book => book._id === bookId) || {};
    const { copies } = findBook;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const form = useForm({
        defaultValues: {
            book: bookId ?? "",
            quantity: 1,
            dueDate: new Date().toISOString(),
        },
    })
    useEffect(() => {
        if (bookId) {
            form.setValue("book", bookId);
        }
    }, [bookId, form]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const Data = {
            ...data,
            quantity: parseInt(data?.quantity),
            dueDate: data?.dueDate.toISOString()
        }
        if (copies < data?.quantity) {
            Swal.fire({
                title: "Sorry copies is not available",
                icon: "error",
                draggable: true
            });
            setOpen(false)
            return navigate('/books')
        }
        const res = await createBorrow(Data)
        if(res){
             Swal.fire({
                title: "Book borrowed successfully",
                icon: "success",
                draggable: true
            });
            setOpen(false)
            return navigate('/borrow-summary')
        }

    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline"><MdBookmarkBorder className="text-base text-purple-400" /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
                    </DialogHeader>

                    <Form {...form} >
                        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>

                            <FormField
                                control={form.control}
                                name="book"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Book Id</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input {...field} value={field.value || ""} placeholder={`Available Book ${copies}`} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            formatDate(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    // selected={field.value}
                                                    onSelect={field.onChange}
                                                    // disabled={(date) =>
                                                    //     date > new Date() || date < new Date("1900-01-01")
                                                    // }
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>

                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="mt-5 bg-green-500" type="submit">Borrow</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AddBorrow;