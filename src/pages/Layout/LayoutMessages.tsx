import { useHeaderMessages } from "@/hooks/useHeaderMessages";
import { Messages } from "primereact/messages";
import { memo, useRef } from "react";

export const LayoutMessages = memo(() =>{
   const msgs = useRef(null);
   useHeaderMessages['msgs'] = msgs;

   return (<>
   <p>Test text</p>
       <Messages ref={msgs} />
   </>)
});

