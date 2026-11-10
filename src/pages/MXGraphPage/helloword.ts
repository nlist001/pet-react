import mx from './mxgraph';
import  type { mxGraph, mxGraphModel } from 'mxgraph'; 



export function helloword(graph: mxGraph){
    console.log('helloword graph',graph)
    let parent = graph.getDefaultParent();


        	const modelGetStyle = graph.model.getStyle;
			graph.model.getStyle = function(cell)
			{
				if (cell != null)
				{
					let style = modelGetStyle.apply(this, arguments);
					
					if (this.isCollapsed(cell))
					{
						style = style + ';shape=image;image=http://www.jgraph.com/images/mxgraph.gif;' +
							'noLabel=1;imageBackground=#C3D9FF;imageBorder=#6482B9';
					}
					
					return style;
				}
				
				return null;
			};


    graph.getModel().beginUpdate();
    try {



        const v1 = graph.insertVertex(parent, null, 'cylinder', 20, 20, 80, 30, 'shape=cylinder;strokeWidth=2;fillColor=#cfcfcf');
        const v2 = graph.insertVertex(parent, null, 'ellipse!', 150, 150, 80, 30,'shape=ellipse');
        const v3 = graph.insertVertex(parent, null, 'label!', 300, 200, 80, 30,'rounded=1');
        const v4 = graph.insertVertex(parent, null, 'cloud!', 450, 200, 80, 30,'shape=cloud');
        const v5 = graph.insertVertex(parent, null, 'rhombus!', 700, 200, 80, 30,'shape=rhombus');

        const e1 = graph.insertEdge(parent, null, ' edge text', v1, v2, 'strokeColor=#cfcfcf');
        const e2 = graph.insertEdge(parent, null, '', v3, v4);
        const e3 = graph.insertEdge(parent, null, '', v5, v4);


        const v6 = graph.insertVertex(parent, null, 'Container', 520, 20, 200, 200, 'shape=swimlane;startSize=20;');
			v6.geometry.alternateBounds = new mx.mxRectangle(0, 0, 110, 70);
			
        const v11 = graph.insertVertex(v6, null, 'Hello,', 10, 40, 120, 80);

        e1.geometry.points = [new mx.mxPoint(150, 50)];
		//graph.orderCells(true, [e1]);

       // const state = graph.view.getState(e1);
		
        console.log('e1',e1);

    } finally {
        graph.getModel().endUpdate();
    }

}