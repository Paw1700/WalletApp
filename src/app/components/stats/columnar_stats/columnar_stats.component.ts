import { Component, Input } from "@angular/core";
import { Column } from "./components/column.component";

@Component({
    selector: 'columnar_stats',
    standalone: true,
    imports: [
        Column
    ],
    templateUrl: './columnar_stats.component.html',
    styleUrl: './columnar_stats.component.scss'
})
export class ColumnarStats {
    @Input({required: true}) data: ColumnStatsData[] = []
    @Input() chart_height_in_vh = 17.6
    max_height_in_px = window.innerHeight * (this.chart_height_in_vh / 100)
}

export type ColumnStatsData = {
    description: string,
    columns: {
        height_in_percent: number,
        color: string | null
    }[]
}