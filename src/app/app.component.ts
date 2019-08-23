import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { json } from 'd3-fetch';
import { forceSimulation, forceLink, forceX, forceY, forceManyBody, SimulationLinkDatum, forceCenter, forceCollide } from 'd3-force';
import { hierarchy } from 'd3-hierarchy';
import { DataLink, DataNode, GraphData } from './dto/dto';
import { RxifyWorker } from './worker-utils/rxify-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxify-worker-angular';

  @ViewChild('graph', { read: ElementRef, static: true })
  graphEl: ElementRef;

  graphData: GraphData = {
    nodes: [],
    links: [],
    progress: 0
  };

  width = 1200;
  height = 1200;

  progressValue = 0;


  ngOnInit() {
    this.prepareData();
    this.calculateLayout(this.graphData);
  }

  private calculateLayout(grpahData: GraphData) {
    const rxify = new RxifyWorker(new Worker('./app.worker', { type: 'module' }));
    rxify.sendMessage(this.graphData).subscribe((result: GraphData) => {
      this.progressValue = result.progress;
      if (result.progress === 100) {
        this.drawGraph(result);
      }
    });
  }

  private prepareData() {
    for (let i = 0; i < 5000; i++) {
      this.graphData.nodes.push({ id: i, r: 3 });
      const from = Math.round(Math.sqrt(i));
      const to = i;
      this.graphData.links.push({
        source: this.graphData.nodes[from],
        target: this.graphData.nodes[to]
      });
    }
  }


  private drawGraph(graphData: GraphData) {

    const context: CanvasRenderingContext2D = (this.graphEl.nativeElement as HTMLCanvasElement).getContext('2d');
    context.clearRect(0, 0, this.width, this.height);
    context.save();
    context.translate(this.width / 2, this.height / 2);
    context.scale(0.5, 0.5);
    context.beginPath();
    graphData.nodes.forEach((d: DataNode) => {
      context.moveTo(d.x + d.r, d.y);
      context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
    });
    context.fillStyle = '#FF9C32';
    context.fill();
    context.strokeStyle = '#C25400';
    context.stroke();

    context.strokeStyle = '#DFA100';
    context.beginPath();
    graphData.links.forEach((d: DataLink) => {
      const source: DataNode = (d.source as DataNode);
      const target: DataNode = (d.target as DataNode);
      context.moveTo(source.x, source.y);
      context.lineTo(target.x, target.y);
    });
    context.stroke();

    context.restore();

  }

}

