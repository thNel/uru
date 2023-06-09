import {Carousel} from "react-responsive-carousel";
import {apiUrls} from "@/constants/api";
import {Item} from "@/interfaces/server";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const WinPossibility = ({winGroup, itemList}: { winGroup: string, itemList: Item[] }) => {

  return (
    <div
      className="p-2 bg-dark-08 rounded-3 d-flex flex-fill"
      style={{minWidth: 100, minHeight: 100, maxWidth: 200, maxHeight: 200, aspectRatio: '1/1', width: 'min-content'}}
    >
      <div
        className="rounded-3 h-100 w-100"
        style={{
          aspectRatio: '1/1',
          backgroundImage: `url('/media/numbers/${winGroup}.png')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Carousel
          axis="vertical"
          autoPlay
          infiniteLoop
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          stopOnHover={false}
          useKeyboardArrows={false}
          swipeable={false}
          emulateTouch={false}
          interval={1500}
          transitionTime={1000}
        >
          {itemList.map((item) =>
            <div
              key={item.shortname}
              className="bg-dark-03 d-flex flex-fill mw-100 mh-100"
              style={{aspectRatio: '1/1'}}
            >
              <img
                src={apiUrls.itemDefaultIconUrl + item.shortname + apiUrls.defaultIconExtension}
                alt={item.shortname}
              />
            </div>
          )
          }
        </Carousel>
      </div>
    </div>
  )
}

export default WinPossibility;