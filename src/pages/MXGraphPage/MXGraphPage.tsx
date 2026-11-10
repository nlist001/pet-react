import { useEffect, useRef } from 'react';
import mx from './mxgraph';
import type { mxGraph, mxGraphModel } from 'mxgraph'; 
import { helloword } from './helloword';


export default function MXGraphPage(){
    const container = useRef(null);

    useEffect(()=>{
        console.log('MXGraphPage')

        const graph: mxGraph = new mx.mxGraph(container.current, new mx.mxGraphModel());
        graph.setConnectable(true);
        graph.setAllowDanglingEdges(false);
        //let mxClient = mxnspaceobj.mxClient
        /* let mxRubberband = mxnspaceobj.mxRubberband
        let mxKeyHandler = mxnspaceobj.mxKeyHandler        
        let mxUtils = mxnspaceobj.mxUtils
        let mxEvent = mxnspaceobj.mxEvent
 */
    
        // Now, the tricky one, because most examples codes directly use the 
        // following statement :
        // let graph = new mxGraph(container); 
        // which will fail.
    
        // Instead, we have to call the mxGraph constructor via mxnspaceobj
        // variable as follows :
        //let graph = new mxGraph(container);

        // -- The rest is the same as usually found in examples -- //

        //new mxRubberband(graph);
        helloword(graph);
    },[])


    return (<div ref={container} className='bg-white'></div>)
}

