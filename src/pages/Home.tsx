import Banner from "@/components/Banner/Banner";
import FeaturedBook from "@/components/FeaturedBook/FeaturedBook";

const Home = () => {
   
    return (
        <div>
            <Banner></Banner>
            <div className="flex justify-center underline lg:my-10 my-5">
                <h2 className="text-2xl font-medium">Our Books</h2>
            </div>
            <FeaturedBook></FeaturedBook>
        </div>
    );
};

export default Home;