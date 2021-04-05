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
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });

  countries: any; // List of countries
  states: any; // List of states
  persons: any; // List of person

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

  getAllCountries(): void {
    this.countryService.getAllCountries()
      .subscribe(resp => {
        this.countries = resp;
      }
        , error => {
          console.error('Error loading countries: ', error);
        }
      )
  }

  loadStatesByCountryId(value: any): void {
    this.stateService.getStatesByCountry(value)
      .subscribe(resp => {
        this.states = resp;
      }
        , error => {
          console.error('Error loading states: ', error);
        }
      )
  }

  getALlPersons(): void {
    this.personService.getALlPersons()
      .subscribe(resp => {
        this.persons = resp;
      }
        , error => {
          console.error('Error loading persons: ', error);
        }
      )
  }

  savePerson(): void {
    this.personService.savePerson(this.personForm.value)
      .subscribe(resp => {
        this.personForm.reset(); // Reset form values
        this.persons = this.persons.filter((item: any) => resp.id != item.id);
        this.persons.push(resp); // Added person to show table real time
      }
        , error => {
          console.error('Error saving the person: ', error);
        }
      )
  }

  deletePerson(person: any): void {
    this.personService.deletePerson(person.id)
      .subscribe(resp => {
        (resp) ? this.persons.pop() : ''; // If person is delete
      }
        , error => {
          console.error('Error deleting the person: ', error);
        }
      )
  }

  editPerson(person: any): void {
    this.personForm.setValue({
      id: person.id,
      name: person.name,
      lastName: person.lastName,
      age: person.age,
      country: person.country,
      state: person.state,
    });

  }
}
