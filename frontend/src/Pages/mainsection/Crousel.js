import { Carousel, Typography, Button } from "@material-tailwind/react";
import clothing from "../../images/clothing.jpg";
import grocery from "../../images/grocery.jpg";
import jewellary from "../../images/jewellary.webp";
import electrnics from "../../images/mumbaishop.jpg";
import pepejeans from "../../images/pepejeans.webp";
import "../styles/Crousel.css";

const Crousel = () => {
  return (
    <Carousel className="rounded-xl">
      <div className="relative h-full w-full">
        <img
          // src={jewellary}
          src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5632371.jpg&fm=jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Jewelry: Explore an exquisite collection of finely crafted jewelry
              at Mumbai's premier jewelers. From timeless classics to modern
              designs, each piece reflects elegance and sophistication, perfect
              for any occasion.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          // src={electrnics}
          src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709596800&semt=ais"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Clothing: Immerse yourself in Mumbai's vibrant fashion scene with
              an extensive selection of clothing for every style and occasion.
              From chic urban trends to traditional attire, discover the perfect
              ensemble to express your unique personality.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          // src={clothing}
          src="https://img.freepik.com/premium-vector/background-with-colorful-shopping-bags-vector-illustration-sale-discount-concept_653240-59.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Clothing: Immerse yourself in Mumbai's vibrant fashion scene with
              an extensive selection of clothing for every style and occasion.
              From chic urban trends to traditional attire, discover the perfect
              ensemble to express your unique personality.
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          // src={grocery}
          img="https://st4.depositphotos.com/12985790/25316/i/450/depositphotos_253164172-stock-photo-cropped-view-young-woman-holding.jpg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Grocery: Delve into a world of fresh produce, pantry staples, and
              specialty items at Mumbai's finest grocery store. Enjoy a
              convenient and diverse shopping experience for all your culinary
              needs.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          // src={pepejeans}
          src="https://t4.ftcdn.net/jpg/02/70/41/97/360_F_270419713_kNsOeqrG91dwy5qtbWxQCbUZrCAAwLIX.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Pepe Jeans: Step into the realm of fashion-forward denim and
              casual wear with Pepe Jeans. Experience the perfect blend of style
              and comfort, designed to elevate your everyday wardrobe with
              effortless flair.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};
export default Crousel;
