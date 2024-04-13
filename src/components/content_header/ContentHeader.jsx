import React from 'react'
import "./contentheader.css"

const ContentHeader = ({header, description}) => {
    return (
        <>
            <div className="content-header">
                <h2>{header}</h2>
                <p>{description}</p>
            </div>
        </>
    )
}

export default ContentHeader