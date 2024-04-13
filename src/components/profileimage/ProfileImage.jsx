import React from 'react';
import "./profileImage.css";
import Image from 'next/image';

const ProfileImage = ({image}) => {
    return (
        <>
            <div className="right">
                <div className="profile-image">
                    <Image
                        src={image}
                        alt='Profile Image'
                        width={600}

                    />
                </div>
            </div>
        </>
    )
}

export default ProfileImage