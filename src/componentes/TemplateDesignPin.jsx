import { AnimatePresence, motion, } from 'framer-motion';
import React, { useState } from 'react'
import { FadeInOutWithOpacity, scaleInOut } from '../animation';
import {  BiFolderPlus,BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';

import useUser from "../hooks/useUser"
import { saveToCollections, saveToFavourites } from '../api';
import useTemplate from "../hooks/useTemplates"
import { useNavigate } from 'react-router-dom';

const TemplateDesignPin = ({data, index}) => {
  const {data : user, refetch : userRefetch} =useUser();
  const {refetch : temp_refetch}= useTemplate();
  const [isHoverred, setIsHoverred]=useState(false);

  const navigate = useNavigate()

  const addToCollection = async(e) =>{
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  };
  const addToFavourites = async(e)=>{
    e.stopPropagation();
    await saveToFavourites(user, data);
    temp_refetch();
  }

  const handleRouteNavigation = () =>{
    navigate (`/resumeDetail/${data?._id}`,{replace : true})
  }
  return (
    <motion.div
     key={data?._id}
     {...scaleInOut(index)}

    >
      <div className=" w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-300 overflow-hidden relative" 
      onMouseEnter ={()=> setIsHoverred(true)}
      onMouseLeave ={()=> setIsHoverred(false)}
      
      >
        <img
         src={data?.imageURL} 
        className="w-full h-full object-cover" 
        alt=""
        />
        <AnimatePresence>
          {isHoverred && (
            <motion.div 
            {...FadeInOutWithOpacity} 
            onClick={handleRouteNavigation}
            className="absolute inset-0 bg-[rgba(0,0,0,0,4)] flex flex-col items-start justify-start px-4 py-3 z-50 cursor-pointer"
            >
              <div className="flex flex-col items-end justify-start w-full gap-8">
                <InnerBoxCard 
                label={
                  user?.collections?.includes(data?._id) 
                  ? "Added to collection"
                  :"Add to collection"
                } 
                Icon={
                  user?.collections?.includes(data?._id)
                  ? BiSolidFolderPlus
                  : BiFolderPlus
                } 
                onHandle={addToCollection}
                />
                 <InnerBoxCard 
                label={data?.favourites?.includes(user?.uid) ? "Added To Favourites":"Add To  Favourites"} 
  
                Icon={data?.favourites?.includes(user?.uid) ? BiSolidHeart : BiHeart} 
                onHandle={addToFavourites}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
};
const InnerBoxCard = ({label, Icon, onHandle}) => {
  const [isHoverred, setIsHoverred]= useState(false)
  return(
    <div onClick={onHandle} className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative"
    onMouseEnter={()=>setIsHoverred(true)}
    onMouseLeave={()=>setIsHoverred(false)}
    >


      <Icon className="text-txtPrimary text-base"/>
      <AnimatePresence>
        {isHoverred && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.6, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 50 }}
            exit={{ opacity: 0, scale: 0.6, x: 50 }}
      
          className="px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-gray-300 after:absolute after:-right-1 after:top-[14px] after:rotate-45">
            <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TemplateDesignPin;


// import React, { useState } from 'react';
// import { AnimatePresence, motion } from "framer-motion";
// import { FadeInOutWithOpacity, scaleInOut } from '../animation';
// import { BiFolderPlus, BiHeart, BiSolidHeart } from 'react-icons/bi';
// import useUser from '../hooks/useUser';
// import { saveToCollections, saveToFavourites } from '../api';
// import useTemplates from '../hooks/useTemplates';
// import { Navigate, useNavigate } from 'react-router-dom';

// const TemplateDesignPin = ({ data, index }) => { // Destructure data and index correctly

//   const { data: user, refetch: userRefetch } = useUser();
//   const { refetch : temp_refetch}= useTemplates()

//   const [isHoverred, setIsHoverred]=useState(false)

//   const navigate = useNavigate()

//   const addToCollection = async (e) => {
//     e.stopPropagation();
//     await saveToCollections(user, data);
//     userRefetch();
//   };

//   const addToFavourites = async (e) => {
//     e.stopPropagation();
//     await saveToFavourites(user, data);
//     temp_refetch();
//   };

//   const handleRouteNavigation = () =>{
//     Navigate(`/resumeDetail/${data?._id}`, {replace: true});
//   };

//   return (
//     <motion.div
//       key={data?._id}
//       {...scaleInOut}
//     >
//       <div className="w-full h-[500px] 2xl:h-[740] rounded-md bg-gray-200 overflow-hidden relative">
//         onMouseEnter={()=> setIsHoverred(true)}
//         onMouseLeave={() => setIsHoverred(false)}
//         <img
//           src={data?.imageURL}
//           className="w-full h-full object-cover"
//           alt=""
//         />

//         <AnimatePresence>
//           {isHoverred && <motion.div
//             {...FadeInOutWithOpacity}
//             className="absolute inset-0 bg-[rgba(0,0,0,0,4)] flex flex-col items-center justify-normal"
//           >
//             <div className="flex flex-col items-end justify-start w-full gap-8">
//               <InnerBoxCard
//                 label={user?.collections?.includes(data?._id)
//                    ? "Added in the collections"
//                    : "Add to collections"
//                 }
//                 Icon={data?.collections?.includes(user?.uid)?BiFolderPlus 
//                 :BiFolderPlus
//                }
//                 onHandle={addToCollection}
//               />

//               <InnerBoxCard
//                 label={data?.favourites?.includes(user?.uid)? 
//                   "Added to Favourites" : "Add to Favourites"}

//                 Icon={
//                   data?.favourites?.includes(user?.uid)? BiSolidHeart: BiHeart}
//                 onHandle={addToCollection} // Corrected to addToFavourites
//               />
//             </div>
//           </motion.div>}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// };

// const InnerBoxCard = ({ label, Icon, onHandle }) => {
//   const [isHoverred, setIsHoverred] = useState(false);

//   return (
//     <div onClick={onHandle} className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative">
//       <Icon className="text-txtPrimary text-base" />
//       <AnimatePresence>
//         {isHoverred && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.6, x: 50 }}
//             animate={{ opacity: 1, scale: 1, x: 50 }}
//             exit={{ opacity: 0, scale: 0.6, x: 50 }}
//             onMouseLeave={() => setIsHoverred(false)}
//             className="px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-red-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45"
//           >
//             <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default TemplateDesignPin;






// // import React, { useState } from 'react'
// // import { AnimatePresence, motion } from "framer-motion"
// // import { FadeInOutWithOpacity, scaleInOut } from '../animation'
// // import { BiFolderPlus, BiHeart } from 'react-icons/bi';
// // import useUser from '../hooks/useUser';
// // import { savaToCollections } from '../api';
// // const TemplateDesignPin = (data, index) => {

// //   const{data : user, refetch : userRefetch} = useUser()

// //   const addToCollection = async(e) =>{
// //     e.stopPropagation();
// //     await savaToCollections(user, data);
// //     userRefetch();
// //   };
// //   const addToFavourites = async()=>{};

// //   return (
// //    <motion.div 
// //    key={data?._id}
// //    {...scaleInOut}
// //    >
// //      <div className="w-full h-[500px] 2xl:h-[740] rounded-md bg-gray-200 overflow-hidden relative">
// //       <img 
// //       src={data?.imageURL} 
// //       className="w-full h-full object-cover"
// //       alt=""
// //        />

// //        <AnimatePresence>
// //         <motion.div {...FadeInOutWithOpacity} className=" absolute inset-0 bg-[rgba(0,0,0,0,4)] flex flex-col items-center justify-normal"
// //         >
// //           <div className="flex flex-col items-end justify-start w-full gap-8"
// //           >
// //             <InnerBoxCard 
// //             label={"Add To Collection"} 
// //             Icon={BiFolderPlus} 
// //             onHandle={addToCollection}/>

// //             <InnerBoxCard 
// //             label={"Add To Favourites"} 
// //             Icon={BiHeart} 
// //             onHandle={addToCollection}/>
          
// //           </div>

// //         </motion.div>
// //        </AnimatePresence>
// //      </div>
// //    </motion.div>
// //   );
// // };
// // const InnerBoxCard =({label, Icon, onHandle}) =>{
// //   const[isHoverred, setIsHoverred] = useState(false)

// //   return(
// //     <div onClick={onHandle} className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative">
// //       <Icon className=" text-txtPrimary text-base"/>
// //       <AnimatePresence>
// //        {isHoverred && ( <motion.div 
// //         initial={{opacity: 0,scale:0.6, x:50}} 
// //         animate={{opacity: 1,scale:1, x:50}} 
// //         exit={{opacity: 0,scale:0.6, x:50}} 
// //         onMouseLeave={() => setIsHoverred(false)}
        
// //         className="px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-red-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45">
// //             <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
// //         </motion.div>)}
// //       </AnimatePresence>
// //     </div>
// //   )
// // }

// // export default TemplateDesignPin