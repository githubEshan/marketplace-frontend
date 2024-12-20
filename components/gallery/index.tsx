"use client"

import Image from "next/image";
import { Image as ImageType } from "@/types"
import { Tab, TabGroup, TabList, TabPanel } from "@headlessui/react";
import GalleryTab from "./gallery-tab";


interface GalleryProps {
    images: ImageType[];
};

const Gallery: React.FC<GalleryProps> = ({
    images
}) => {
    return (
        <TabGroup as= "div" className= "flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block">
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map((image)=> (
                        <GalleryTab key = {image.id} image = {image}/>
                    ))}
                </TabList>
            </div>
            <TabPanel className="apect-square w-full">
                {images.map((image)=> (
                    <TabPanel key = {image.id}>
                        <div className="aspect-square relative h-full w-full">
                            <Image
                            fill
                            src= {image.url}
                            alt="Image"
                            className="object-cover object center"/>

                        </div>
                    </TabPanel>
                ))}
            </TabPanel>
        </TabGroup>
 
    );
}
 
export default Gallery;