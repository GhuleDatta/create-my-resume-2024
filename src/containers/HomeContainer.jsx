
import React from 'react';
import { Filters, MainSpinner, TemplateDesignPin } from "../componentes";
import useTemplates from '../hooks/useTemplates';
import { AnimatePresence } from 'framer-motion';


const HomeContainer = () => {

  const {
        data: templates,
        isError: temp_isError,
        isLoading: temp_isLoading,
        refetch: temp_refetch
      } = useTemplates();

      if (temp_isLoading) {
            return <MainSpinner />;
          }

  return (
    <div className="w-full px-4 lg:px-12 flex flex-col items-center justify-start">
       {/* Filter section */}

      <Filters/>

       {/* Render the templates - Resume Pin */}
       {temp_isError? (
       <React.Fragment>
        <p className="text-lg text-txtDark">Something went wrong...please try again later</p>
       </React.Fragment>
       ):(
       <React.Fragment>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
          <RenderATemplate templates={templates}/>

        </div>
       </React.Fragment>
       )}
      </div>
  );
};
const RenderATemplate = ({templates}) =>{
  return(
    <React.Fragment>
      {templates && templates?.length > 0 ? 
      (
      <React.Fragment>
        <AnimatePresence>
          {templates && templates.map((template,index) => (

            <TemplateDesignPin 
            key={template?._id}
            data={template} 
            index={index}
            />
          ))}
        </AnimatePresence>
      </React.Fragment>
      ):(
      <React.Fragment>
        <p>No Data Found</p>
      </React.Fragment>
    )}
    </React.Fragment>
  )

}

export default HomeContainer












// import React from 'react';
// import { Filters, MainSpinner, TemplateDesignPin } from "../componentes";
// import useTemplate from "../hooks/useTemplates";
// import { AnimatePresence } from 'framer-motion';

// const HomeContainer = () => {
//   const {
//     data: templates,
//     isError: temp_isError,
//     isLoading: temp_isLoading,
//     refetch: temp_refetch
//   } = useTemplate();

//   if (temp_isLoading) {
//     return <MainSpinner />;
//   }

//   return (
//     <div className="w-full px-4 lg:px-12 flex flex-col items-center justify-start">
//       {/* Filter section */}
//       <Filters />

//       {/* Render the templates - Resume Pin */}
//       {temp_isError ? (
//         <p className="text-lg text-txtDark">Something went wrong... Please try again later</p>
//       ) : (
//         <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
//           <RenderTemplates templates={templates} />
//         </div>
//       )}
//     </div>
//   );
// };

// const RenderTemplates = ({ templates }) => {
//   return (
//     <React.Fragment>
//       {templates && templates.length > 0 ? (
//         <AnimatePresence>
//           {templates.map((template, index) => (
//             <TemplateDesignPin
//               key={template?._id}
//               data={template}
//               index={index}
//             />
//           ))}
//         </AnimatePresence>
//       ) : (
//         <p>No Data found</p>
//       )}
//     </React.Fragment>
//   );
// };

// export default HomeContainer;







// //  import React from 'react'
// //  import { Filters, MainSpinner, TemplateDesignPin } from "../componentes";
// //  import useTemplate from "../hooks/useTemplates"
// // import { AnimatePresence } from 'framer-motion';
 
// //  const HomeContainer = () => {

// // const{
// //   data : templates,
// //    isError : temp_isError,
// //    isLoading : temp_isLoading,
// //     refetch : temp_refetch
// //   }= useTemplate()

// //   if(temp_isLoading){
// //     return<MainSpinner/>
// //   }

// //    return (
// //      <div className="w-full px-4 lg:px-12 flex flex-col items-center
// //      justify-start"
// //      >
// //     {/*Filter section */}
    
// //     <Filters/>


// //     {/* Render those templete - resume Pin */}
// //     {temp_isError ? 
// //     (<React.Fragment>
// //       <p className="text-lg text-txtDark">Something went Wrong...Plese try agen later</p>
// //     </React.Fragment>
// //     ):(
// //     <React.Fragment>
// //       <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
// //         <RenderATemplate templates={templates}/>
// //       </div>
// //     </React.Fragment>)}
// //      </div>
// //    )
// //  }
 
 
// //  const RenderATemplate =({templates})=>{
// //   return(
// //     <React.Fragment>
// //     {templates && templates.length > 0 ? (
// //       <AnimatePresence>
// //         {templates.map((template, index) => (
// //           <TemplateDesignPin 
// //             key={template?._id}
// //             data={template} 
// //             index={index}
// //           />
// //         ))}
// //       </AnimatePresence>
// //     ) : (
// //       <React.Fragment>
// //         <p>No Data found</p>
// //       </React.Fragment>
// //     )}
// //   </React.Fragment>
  
// //   )

// //  }
// //  export default HomeContainer;