import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, EffectFade } from "swiper/modules";

const FileShow = ({ files }) => {
  if (!files || files.length === 0) return <p>فایلی وجود ندارد !</p>;

  // اگر فقط یک عکس
  if (files.length === 1) {
    return (
      <img
        src={files[0].fileAddress}
        alt="file"
        style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }}
      />
    );
  }

  // اگر بیشتر از یک عکس → اسلایدر
  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFade]}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      loop={true}
      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}

    >
      {files.map(file => (
        <SwiperSlide key={file.id}>
          <img
            src={file.fileAddress}
            alt="file"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default FileShow