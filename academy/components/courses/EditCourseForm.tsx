"use client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Course } from "@prisma/client"

import { Button } from "../../components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title is required and must be at least 2 characters long"
    }),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    categoryId: z.string().min(1, {
        message: "Category is required"
    }),
    subCategoryId: z.string().min(1, {
        message: "Subcategory is required"
    }),
    levelId: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.coerce.number().optional(),
})

interface EditCourseFormProps {
    course: Course,
}

const EditCourseForm = ({ course }: EditCourseFormProps) => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title,
            subtitle: course.subtitle || "",
            description: course.description || "",
            categoryId: course.categoryId,
            subCategoryId: course.subCategoryId,
            levelId: course.levelId || "",
            imageUrl: course.imageUrl || "",
            price: course.price || undefined,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Web Development for Beginners"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subtitle</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Become a Full-stack Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB and more!"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                               
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default EditCourseForm
