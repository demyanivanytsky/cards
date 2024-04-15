"use client"

import React, { useEffect, useState } from "react";
import CoursesService from "@/services/CoursesService";
import Image from "next/image";

export interface Course {
    name: string;
    id: string;
    image:string;
    bgColor:string;
    tags:string[];
}

const Home: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Все темы");

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await CoursesService.getInfo();
            setCourses(data);
        };
        fetchInfo();
    }, []);

    const categories = ["Все темы", "Логика и мышление", "Загадки", "Головоломки", "Страны и столицы"];

    const filteredCourses = selectedCategory && selectedCategory !== "Все темы"
        ? courses.filter((course) => course.tags.includes(selectedCategory))
        : courses;

    return (
        <div className="flex flex-wrap   space-x-4 ">
            <div>
                <div className=" ml-4 mt-10 items-start  w-[264px] h-[234px] text-xl flex flex-col justify-between font-bold p-4 border border-t-2 rounded-2xl">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                            className={`rounded-xl py-1 px-1.5 ${selectedCategory === category ? "bg-green-600 rounded-xl w-full text-white py-1 px-1.5 text-left" : ""} `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {filteredCourses.map((course) => (
                <div key={course.id} className="flex mt-10">
                    <div className="h-[210px] w-[393px] rounded-2xl shadow-2xl " style={{ backgroundColor: course.bgColor }}>
                        <div>
                            <Image
                                src={course.image}
                                alt={course.name}
                                width={186}
                                height={186}
                                className="mx-auto rounded-full"
                            />
                            <p className="text-center text-xl font-bold bg-white rounded-b-2xl py-3 m-18">{course.name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
