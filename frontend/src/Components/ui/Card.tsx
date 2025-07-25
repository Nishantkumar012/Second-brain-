import { ShareIcon } from "../../icons/ShareIcon";

// import { IndexPage } from "../../../src/Twitter";

interface CardProps{
        title: string,
        link: string,
        type: "twitter" | "youtube"

}
 
//@ts-ignore
function getYoutubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    } else if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    return url; // fallback in case of error
  }
}


export function Card({title, link, type}: CardProps ) {
  return (
    <div>
      <div className="p-4 bg-white rounded-md shadow-md border-gray-200 max-w-72 min-h-48 border ">
        <div className="flex justify-between">
          <div className="flex items-center text-sm">
            <div className="pr-5 text-gray-500">
              <ShareIcon size="md" />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
                  <a href={link} target="_blank"/>
              <ShareIcon size="md" />
            </div>
            <div className="pr-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          

           {type == "youtube" &&           
          <iframe
            className="w-full"
            src={getYoutubeEmbedUrl(link)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>} 
          
           {type == "twitter" && <blockquote className="twitter-tweet">
            <a href={link.replace("x.com","twitter.com")}></a> 
            </blockquote>}
        



        </div>
      </div>
    </div>
  );
}
