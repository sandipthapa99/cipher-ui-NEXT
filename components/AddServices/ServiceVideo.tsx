import React from "react"

interface ServiceVideoProps {
  title: string
  upperDescription: string
  videoId: string
  lowerDescription: string
}

export const ServiceVideo = ({
  title,
  upperDescription,
  videoId,
  lowerDescription,
}: ServiceVideoProps) => {
  return (
    <div className="service-right-video-section">
      <h3>{title} </h3>
      <p>{upperDescription}</p>

      <iframe
        width="100%"
        height="210"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>{lowerDescription}</p>
    </div>
  )
}
