import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import { AnimatePresence } from 'framer-motion';
import { MainSpinner, TemplateDesignPin } from '../componentes';
import useTemplates from '../hooks/useTemplates';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.config';
import { NoData } from '../assets';
import { useQuery } from 'react-query';
import { getSavedResumes } from '../api';

const UserProfile = () => {
  const { data: user } = useUser();
  const [activeTab, setActiveTab] = useState("collection");
  const navigate = useNavigate();

  const {
    data: templates,
    isError: temp_isError,
    isLoading: temp_isLoading,
    refetch: temp_refetch
  } = useTemplates();

  const { data: saveResumes } = useQuery(["savedResumes"], () => getSavedResumes(user?.uid));

  if (temp_isLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-12">
      <div className="w-full h-72 bg-blue-50">
        <img
          src="https://media.istockphoto.com/id/1979289147/photo/data-analysis-science-and-big-data-with-ai-technology-analyst-or-scientist-uses-a-computer.jpg?s=2048x2048&w=is&k=20&c=CnYhOjeTPisYsN-OLYVp60ZNKK3jP3JCPZrCjxCqmto="
          alt=''
          className='w-full h-full object-cover'
        />

        <div className="flex items-center justify-center flex-col gap-4">
          {user?.photoURL ? (
            <React.Fragment>
              <img
                src={user?.photoURL}
                className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                alt=''
                referrerPolicy="no-referrer"
                loading='lazy'
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                src={"https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_960_720.png"}
                className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                alt=''
                referrerPolicy="no-referrer"
                loading='lazy'
              />
            </React.Fragment>
          )}
          <p className="text-2xl text-txtDark">{user?.displayName}</p>
        </div>

        {/* tabs */}
        <div className="flex items-center justify-center mt-12">
          <div className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("collection")}>
            <p className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${activeTab === "collection" && "bg-white shadow-md text-blue-600"}`}
            >Collection</p>
          </div>

          <div className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("resumes")}>
            <p className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${activeTab === "resumes" && "bg-white shadow-md text-blue-600"}`}
            >My Resumes</p>
          </div>

        </div>
        {/* tab content */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
          <AnimatePresence>
            {activeTab === "collection" && (
              <React.Fragment>
                {user?.collections && user?.collections.length > 0 ? (<RenderATemplate templates={templates?.filter((temp) => user?.collections?.includes(temp?._id))} />
                ) : (
                  <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={NoData}
                      className="w-32 h-auto origin-center"
                      alt=""
                    />
                    <p>No Data</p>
                  </div>)}
              </React.Fragment>
            )}

            {activeTab === "resumes" && (
              <React.Fragment>
                {saveResumes && saveResumes.length > 0 ? (<RenderATemplate templates={saveResumes} />
                ) : (
                  <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={NoData}
                      className="w-32 h-auto origin-center"
                      alt=""
                    />
                    <p>No Data</p>
                  </div>)}
              </React.Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const RenderATemplate = ({ templates }) => {
  return (
    <React.Fragment>
      {templates && templates?.length > 0 &&
        (
          <React.Fragment>
            <AnimatePresence>
              {templates && templates.map((template, index) => (

                <TemplateDesignPin
                  key={template?._id}
                  data={template}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </React.Fragment>
        )}
    </React.Fragment>
  )
}

export default UserProfile;




// import React, { useEffect, useState } from 'react'
// import useUser from '../hooks/useUser'
// import { AnimatePresence } from 'framer-motion';
// import { MainSpinner, TemplateDesignPin } from '../componentes';
// import useTemplates from '../hooks/useTemplates';
// import { useNavigate } from 'react-router-dom';
// import { auth } from '../config/firebase.config';
// import { NoData } from '../assets';
// import { useQuery } from 'react-query';
// import { getSavedResumes } from '../api';

// const UserProfile = () => {
//   const{ data: user } = useUser();
//   const [activeTab,setActiveTab]=useState("collection");
//   const navigate =useNavigate();

//   const {
//     data: templates,
//     isError: temp_isError,
//     isLoading: temp_isLoading,
//     refetch: temp_refetch
//   } = useTemplates();

//   const {data : saveResumes} = useQuery(["savedResumes"],()=>getSavedResumes(user?.uid))
  
//   // useEffect(()=> {
//   //   if(!user){
//   //     navigate("/auth",{replace: true})
//   //      }
//   // },[]);
//   if(temp_isLoading){
//     return <MainSpinner/>;
//   }

//   return (
//     <div className="w-full flex flex-col items-center justify-center py-12">
//       <div className="w-full h-72 bg-blue-50">
//         <img 
//         src="https://media.istockphoto.com/id/1979289147/photo/data-analysis-science-and-big-data-with-ai-technology-analyst-or-scientist-uses-a-computer.jpg?s=2048x2048&w=is&k=20&c=CnYhOjeTPisYsN-OLYVp60ZNKK3jP3JCPZrCjxCqmto="
//           alt=''
//           className='w-full h-full object-cover'
//         />
        
//         <div className="flex items-center justify-center flex-col gap-4">
//         {user?.photoURL?(
//         <React.Fragment>
//           <img 
//           src={user?.photoURL}
//           className="w-24 h-24 rounded-full border-2 border-white -mt-12
//           shadow-md"
//           alt=''
//           referrerPolicy="no-referrer"
//           loading='lazy'
//           />
//         </React.Fragment>
//         ):(
//         <React.Fragment>
//              <img 
//           src={"https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_960_720.png"}
//           className="w-24 h-24 rounded-full border-2 border-white -mt-12
//           shadow-md"
//           alt=''
//           referrerPolicy="no-referrer"
//           loading='lazy'
//           />
//         </React.Fragment>
//         )}
//         <p className="text-2xl text-txtDark">{user?.displayName}</p>
//         </div>

//         {/* tabs */}
//         <div className="flex items-center justify-center mt-12">
//           <div className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
//           onClick={()=>setActiveTab("collection")}>
//             <p className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${activeTab=== "collection" && "bg-white shadow-md text-blue-600"}`}
//             >Collection</p>
//           </div>

//           <div className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
//           onClick={()=>setActiveTab("resumes")}>
//             <p className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full ${activeTab=== "resumes" && "bg-white shadow-md text-blue-600"}`}
//             >My Resumes</p>
//           </div>

//            </div>
//            {/* tab content */}
//           <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
//             <AnimatePresence>
//               {activeTab === "collections" && (
//                 <React.Fragment>
//                   {user?.collections.lenght > 0 && user?.collections ?(<RenderATemplate templates={templates?.filter((temp) =>user?.collections?.includes(temp?._id))}/>
//                 ):(
//                 <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
//                   <img
//                   src={NoData}
//                   className="w-32 h-auto origin-center"
//                   alt=""
//                   />
//                   <p>No Data</p>
//                 </div>)}
//                 </React.Fragment>
//               )}


//                 {activeTab === "collections" && (
//                 <React.Fragment>
//                   {saveResumes?.lenght > 0 && saveResumes ?(<RenderATemplate templates={saveResumes}/>
//                 ):(
//                 <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
//                   <img
//                   src={NoData}
//                   className="w-32 h-auto origin-center"
//                   alt=""
//                   />
//                   <p>No Data</p>
//                 </div>)}
//                 </React.Fragment>
//               )}
//             </AnimatePresence>
//           </div>
//       </div>
//       </div>
//   )
// }

// const RenderATemplate = ({templates}) =>{
//   return(
//     <React.Fragment>
//       {templates && templates?.length > 0 &&
//       (
//       <React.Fragment>
//         <AnimatePresence>
//           {templates && templates.map((template,index) => (

//             <TemplateDesignPin 
//             key={template?._id}
//             data={template} 
//             index={index}
//             />
//           ))}
//         </AnimatePresence>
//       </React.Fragment>
//       )}
//     </React.Fragment>
//   )

// }

// export default UserProfile