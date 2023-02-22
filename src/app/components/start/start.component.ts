import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGameService } from 'src/app/services/city-game.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cityGameService: CityGameService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    console.log('RUNNING!!!');
    this.drawTrack();
  }

  onSubmit() {}

  drawTrack() {
    //add track's elements to grid in html
    let gridContainerParent = document.getElementById('grid-container-parent'); //document.querySelector('#grid-container-parent');

    //let maxNumberOfRows = 9;
    let maxNumberOfColumns = 22;
    const arrayAnglesOfRotation = [
      296.89, 108.89, -45.85, -29.6, -29.6, -29.6, 5.69, 1.63, -3.7, 5.8, 20.67,
      29.44, 27.96, 25.96, 25.67, 25.45, 23.89,
    ];
    let indexOfArrayAngles = 0;

    let countRow = 1;
    for (let i = 1; i <= maxNumberOfColumns; i++) {
      if (i == 1) {
        let trackElem = document.createElement('span');
        trackElem.className = 'material-icons';

        trackElem.style.gridColumn = (i + 3).toString();
        trackElem.style.gridRow = (-i).toString();

        trackElem.style.marginTop = '48px';
        trackElem.innerHTML = '&#xe55c;';

        gridContainerParent?.appendChild(trackElem);
      } else if (i == 2) {
        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '48px',
            '0px',
            '40px',
            i + 1,
            -i + 1
          )
        );

        indexOfArrayAngles++;
      } else if (i == 3) {
        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '80px',
            '32px',
            '0px',
            i + 1,
            -i + 1
          )
        );

        indexOfArrayAngles++;
      } else if (i == 4) {
        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '32px',
            '0px',
            '0px',
            i,
            -i
          )
        );

        indexOfArrayAngles++;
      } else if (i == 5) {
        gridContainerParent?.appendChild(
          this.createTrackElemWithTask(
            'tooltip',
            'tooltiptext1',
            'Task 1',
            '&#xe0c8;',
            '32px',
            '0px',
            i,
            -i
          )
        );
      } else if (i == 9) {
        gridContainerParent?.appendChild(
          this.createTrackElemWithTask(
            'tooltip',
            'tooltiptext2',
            'Task 2',
            '&#xe0c8;',
            '4px',
            '16px',
            i,
            -i
          )
        );
      } else if (i >= 10 && i <= 13) {
        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '0px',
            '0px',
            '0px',
            i,
            1
          )
        );

        indexOfArrayAngles++;
      } else if (i == 14) {
        countRow++;

        gridContainerParent?.appendChild(
          this.createTrackElemWithTask(
            'tooltip',
            'tooltiptext3',
            'Task 3',
            '&#xe0c8;',
            '0px',
            '0px',
            i,
            countRow
          )
        );

        countRow--;
      } else if (i >= 15 && i <= 18) {
        countRow++;

        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '0px',
            '0px',
            '0px',
            i,
            countRow
          )
        );

        indexOfArrayAngles++;
      } else if (i >= 19 && i <= 21) {
        countRow++;

        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '0px',
            '0px',
            '0px',
            i,
            countRow
          )
        );

        indexOfArrayAngles++;
      } else if (i == 22) {
        gridContainerParent?.appendChild(
          this.createTrackElemWithTask(
            'tooltip',
            'tooltiptext4',
            'Final place',
            '&#xe177;',
            '32px',
            '20px',
            i - 1,
            countRow
          )
        );
      } else {
        gridContainerParent?.appendChild(
          this.createTrackDirectionElem(
            'track',
            arrayAnglesOfRotation[indexOfArrayAngles],
            '&#xe931;',
            '0px',
            '0px',
            '0px',
            i,
            -i
          )
        );

        indexOfArrayAngles++;
      }
    }
  }

  createTrackElemWithTask(
    tooltipClass: string,
    tooltipTextClass: string,
    tooltipText: string,
    elemCode: string,
    leftMargin: string,
    topMargin: string,
    columnGrid: number,
    rowGrid: number
  ) {
    //div component for Tooltip
    let divParent = document.createElement('div');
    divParent.className = tooltipClass;
    divParent.style.marginLeft = leftMargin;
    divParent.style.marginTop = topMargin;

    //location material icons
    let trackElem = document.createElement('span');
    trackElem.className = 'material-icons';
    trackElem.innerHTML = elemCode;

    divParent.appendChild(trackElem);

    //span component for TooltipText
    let spanTooltipText = document.createElement('span');
    spanTooltipText.className = tooltipTextClass;
    spanTooltipText.innerText = '\n' + tooltipText;

    divParent.style.gridColumn = columnGrid.toString();
    divParent.style.gridRow = rowGrid.toString();

    //add TooltipText to Tooltip div
    divParent.appendChild(spanTooltipText);

    return divParent;
  }

  createTrackDirectionElem(
    spanParentClass: string,
    angleOfRotation: number,
    elemCode: string,
    leftMargin: string,
    topMargin: string,
    bottomMargin: string,
    columnGrid: number,
    rowGrid: number
  ) {
    let spanParent = document.createElement('span');
    spanParent.className = spanParentClass;
    spanParent.style.transform = 'rotate(' + angleOfRotation + 'deg)';
    spanParent.style.gridColumn = columnGrid.toString();
    spanParent.style.gridRow = rowGrid.toString();

    spanParent.style.marginLeft = leftMargin;
    spanParent.style.marginTop = topMargin;
    spanParent.style.marginBottom = bottomMargin;

    let trackElem = document.createElement('span');
    trackElem.className = 'material-icons';
    trackElem.innerHTML = elemCode;
    trackElem.style.fontSize = '56px';

    spanParent.appendChild(trackElem);

    return spanParent;
  }
}
