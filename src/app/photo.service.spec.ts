import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoService]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve photos from the API via GET', () => {
    const dummyPhotos = [{ albumId: 1, id: 1, title: 'Test Photo', url: 'testurl', thumbnailUrl: 'testthumbnail' }];
    
    service.getPhotos().subscribe(photos => {
      expect(photos.length).toBe(1);
      expect(photos).toEqual(dummyPhotos);
    });

    const request = httpMock.expectOne(`${service.apiUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPhotos);
  });

  afterEach(() => {
    httpMock.verify();
  });
});