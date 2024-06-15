import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getTemplateDetails, saveToCollections, saveToFavourites } from '../api';
import { MainSpinner, TemplateDesignPin } from '../componentes';
import { FaHouse } from 'react-icons/fa6';
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';
import useUser from '../hooks/useUser';
import useTemplates from '../hooks/useTemplates';
import { AnimatePresence } from 'framer-motion';


const TemplateDesignPinDetails = () => {
  const { templateID } =useParams();

  const{data, isError, isLoading, refetch} = useQuery(
     ["template", templateID],
     () => getTemplateDetails(templateID)
  );

  const {data: user, refetch: userRefetch} = useUser();

  const {data : templates, refetch:temp_refetch, isLoading:temp_isLoading} = useTemplates()

  const addToCollection = async(e) =>{
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  };

  const addToFavourites = async(e)=>{
    e.stopPropagation();
    await saveToFavourites(user, data);
    temp_refetch();
    refetch();
  }

  if(isLoading) return <MainSpinner/>;

  if(isError){
    return(
      <div className="w-full h-[60h] flex flex-col items-center
       justify-center">
        <p className="text-lg text-txtPrimary font-semibold">Error while fetching the data.... please try again letar</p>
       </div>
    );
  }

  return <div className="w-full flex items-center justify-start flex-col px-4 py-12">
    {/* bread crup */}
    <div className="w-full flex items-center pb-8 gap-2">
     <Link to={"/"} className=" flex items-center justify-center gap-2 text-txtPrimary">
      <FaHouse/>Home
     </Link>
     <p>/</p>
     <p>{data?.name}</p>
    </div>

{/* Deasine main section layout */}
  <div className="w-full grid grid-cols-1 lg:grid-cols-12">
  {/* left section  */}
       <div 
       className=" col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">

        {/*load the template image */}
        <img className="w-full h-auto object-contain rounded-md" 
        src={data?.imageURL} 
        alt=""
        />
        {/* title and other option */}

        <div className="w-full flex flex-col items-start justify-start gap-2">
          {/* title section */}
        <div className="w-full flex items-center justify-between">
          <p className="text-base text-txtPrimary font-semibold">{data?.title}</p>

          {/* LIKES */}
                {data?.favourites?.length > 0 && (

                
            <div className="flex items-center justify-center gap-1">
              <BiSolidHeart className=" text-base text-red-500"/>
              <p className="text-base text-txtPrimary font-semibold">{data?.favourites?.length}likes</p>
            </div>
              )}
             </div>


             {/* collection favourite options */}
              {user && (
                <div className="flex items-center justify-center gap-3">
                  {user?.collections?.includes(data?._id) ?
                  (<React.Fragment>
                    <div 
                    onClick={addToCollection} className="fle items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                      <BiSolidFolderPlus className="text-base text-txtPrimary "/>
                      <p className="text-sm text-txtPrimary whitespace-nowrap">Remove From Collection</p>
                    </div>
                  </React.Fragment>
                  ):(
                  <React.Fragment>
                    <div 
                    onClick={addToCollection} className="fle items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                      <BiFolderPlus className="text-base text-txtPrimary "/>
                      <p className="text-sm text-txtPrimary whitespace-nowrap">Add to Collection</p>
                    </div>
                  </React.Fragment>

                  )}


                  {data?.favourites?.includes(user?.uid) ?
                  (<React.Fragment>
                    <div 
                    onClick={addToFavourites} className="fle items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                      <BiSolidHeart className="text-base text-txtPrimary "/>
                      <p className="text-sm text-txtPrimary whitespace-nowrap">
                        Remove From Favourites
                        </p>
                    </div>
                  </React.Fragment>
                  ):(
                  <React.Fragment>
                    <div 
                    onClick={addToFavourites} className="fle items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer">
                      <BiHeart className="text-base text-txtPrimary "/>
                      <p className="text-sm text-txtPrimary whitespace-nowrap">Add to Favorites</p>
                    </div>
                  </React.Fragment>

                  )}


                </div>
              )}

          </div>
       </div>

  {/* right section */}
      <div className=" col-span-1 lg:col-span-4  w-full flex flex-col items-center justify-start px-3 gap-6">
        {/* discover more option */}
        <div 
        className="w-full h-72 bg-blue-200 rounded-md overflow-hidden relative" style={{background : "url(https://cdn.pixabay.com/photo/2024/03/27/17/14/ai-generated-8659507_1280.jpg)",backgroundPosition : "center",
          backgroundSize : "cover",
        }}
        >

        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
          <Link to={"/"} className="px-4 py-2 rounded-md border-2  border-gray-50 text-white">
            Discover More
          </Link>
        </div>

        </div>

        {/* edit the template section */}
        {/* localhost:3000/resume/proffessional/145255 */}
        {user && (
          <Link className="w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer" to={`/resume/${data?.name}?templateId=${templateID}`}>
            <p className="text-white font-semibold text-lg">Edit this Template</p>
          </Link>
        )}
        {/* tags */}
        <div className="w-full flex items-center justify-start flex-wrap gap-2">
          {data?.tags?.map((tag,index) => (
            <p className=" text-xs border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap" key={index}>
              {tag}
            </p>

          ))}
        </div>
        </div>
    </div>
    {/* similar templates */}
    {templates?.filter((temp)=> temp._id !== data?._id)?.length > 0 &&(
      <div className="w-full py-8 flex flex-col  items-start justify-start gap-4">
      <p className="text-lg font-semibold text-txtDark">You might also like</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2"><React.Fragment>
        <AnimatePresence>
          {
          templates?.filter((temp)=> temp._id !== data?._id) && templates.map((template,index) => (

            <TemplateDesignPin 
            key={template?._id}
            data={template} 
            index={index}
            />
          ))}
        </AnimatePresence>
      </React.Fragment></div>
    </div>
    )}
  </div>;
};



export default TemplateDesignPinDetails;