import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StatesService } from './services/state/states.service';
import { PersonsService } from './services/person/persons.service';
import { CountriesService } from './services/country/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'crud-spring-angular';

  // Se le agregan los elementos que va a tener el formulario
  personForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });

  countries: any; // List of countries
  states: any; // List of states
  person: any; // List of person

  constructor(
    public fb: FormBuilder,
    public personService: PersonsService,
    public stateService: StatesService,
    public countryService: CountriesService
  ) { }

  ngOnInit(): void {
    // Get list of all countries
    this.getAllCountries();
    // Get list of states by country
    this.personForm.get('country')?.valueChanges.subscribe(value => {
      this.loadStatesByCountryId(value.id);
    })
    // Get list of persons
    this.getALlPersons();
  }

  getAllCountries() {
    this.countryService.getAllCountries()
      .subscribe(resp => {
        this.countries = resp;
      }
        , error => {
          console.log('Error loading countries: ', error);
        }
      )
  }

  loadStatesByCountryId(value: any) {
    this.stateService.getStatesByCountry(value)
      .subscribe(resp => {
        this.states = resp;
      }
        , error => {
          console.log('Error loading states: ', error);
        }
      )
  }

  getALlPersons() {
    this.personService.getALlPersons()
      .subscribe(resp => {
        this.person = resp;
      }
        , error => {
          console.log('Error loading persons: ', error);
        }
      )
  }

  savePerson(): void {
    this.personService.savePerson(this.personForm.value)
      .subscribe(resp => {
        this.personForm.reset(); // Reset form values
      }
        , error => {
          console.log('Error saving the person: ', error);
        }
      )
  }
}
