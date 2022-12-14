import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RzComponentsService } from '@gabrielcosi/rz-components';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private sharedComponents: RzComponentsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.authService
      .login(this.form.getRawValue())
      .then(() => this.router.navigate(['/documents']))
      .catch(e => this.sharedComponents.openSnackBar(e.message, 'error'));
  }
}

