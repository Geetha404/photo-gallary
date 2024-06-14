import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PhotoGalleryComponent } from './photo-gallery.component';
import { PhotoService } from '../photo.service';

describe('PhotoGalleryComponent', () => {
  let component: PhotoGalleryComponent;
  let fixture: ComponentFixture<PhotoGalleryComponent>;
  let mockPhotoService: any;

  beforeEach(async () => {
    mockPhotoService = jasmine.createSpyObj(['getPhotos']);
    await TestBed.configureTestingModule({
      declarations: [PhotoGalleryComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: PhotoService, useValue: mockPhotoService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalleryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display photos', () => {
    const photos = [{ thumbnailUrl: 'testthumbnail', title: 'Test Photo' }];
    mockPhotoService.getPhotos.and.returnValue(of(photos));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.photo').length).toBe(1);
  });
});
