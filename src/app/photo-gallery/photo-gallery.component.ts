import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  photos: any[] = [];

  constructor(public photoService: PhotoService) { }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe((data) => {
      this.photos = data.slice(0, 50); // Limit to 50 photos for display
    });
  }
}