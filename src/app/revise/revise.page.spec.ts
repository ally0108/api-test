import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { RevisePage } from "./revise.page";

describe("RevisePage", () => {
  let component: RevisePage;
  let fixture: ComponentFixture<RevisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevisePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(RevisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
