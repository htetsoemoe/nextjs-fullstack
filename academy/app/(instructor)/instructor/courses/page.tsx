import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "../../../../components/ui/button"
import { db } from "@/lib/db";

const CoursePage = async () => {
    const { userId } = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    // Fetch all course of current login user from DB
    const courses = await db.course.findMany({
        where: {
            instructorId: userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className='px-6 py-4'>
            <Link href="/instructor/create-course">
                <Button>Create New Course</Button>
            </Link>

            <div className="mt-5">
                {courses.map((course) => (
                    <Link href={`/instructor/courses/${course.id}/basic`}>{course.title}</Link>
                ))}
            </div>
        </div>
    )
}

export default CoursePage
