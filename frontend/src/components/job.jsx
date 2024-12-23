import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'

const job = () => {
    return (
        <div>
            <div>
                <p>2 days ago</p>
                <Button className="rounded-full " size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" size="icon">
                    <Avatar>
                        <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1>Comapany Name</h1>

                </div>
            </div>
        </div>
    )
}

export default job