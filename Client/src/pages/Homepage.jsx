import Corousel from "../components/Corousel";
import Layout from "../Layout";

function Homepage() {
  return (
    <>
      {/* Hero Section Starts*/}
      <Layout>
        <div className="ml-5 mr-5 mt-2">
          <Corousel />
        </div>

        {/* Shop By Category Div */}

        <div>
          <div className="flex flex-wrap items-center ">
            <div className="w-[30rem] h-[20rem] border border-black ">
              <div>Shop By Category</div>
            </div>
            <div>
              <div className="flex flex-wrap justify-between gap-4 w-full ml-20">
                <div className="h-[3rem] w-[10rem] border-2 border-[#a0bbf360] rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Personal Care</span>
                </div>

                <div className="h-[3rem] w-[10rem] border-2 border-black rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Accessories</span>
                </div>

                <div className="h-[3rem] w-[10rem] border-2 border-black rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Perfume</span>
                </div>

                <div className="h-[3rem] w-[10rem] border-2 border-black rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Tshirt</span>
                </div>

                <div className="h-[3rem] w-[10rem] border-2 border-[#a0bbf360] rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Personal Care</span>
                </div>

                <div className="h-[3rem] w-[10rem] border-2 border-[#a0bbf360] rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Personal Care</span>
                </div>

                <div className="h-[3rem] w-[10rem] border-2 border-[#a0bbf360] rounded-lg drop-shadow-md items-center justify-center flex">
                  <span>Personal Care</span>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* Hero Section Ends */}
    </>
  );
}

export default Homepage;
