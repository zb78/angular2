import { Component, OnInit, OnDestroy } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Subject, interval } from 'rxjs';
import { tap, take, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {

  faceSnaps!: FaceSnap[];
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();

    interval(1000).pipe(
      // take(3),
      takeUntil(this.destroy$),
      tap(console.log)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }


}
