import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthUser } from '../../../auth/models/auth-user.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() authUser: AuthUser;
  @Output() signedOut = new EventEmitter<void>();

  signOut () {
    this.signedOut.emit();
  }
}
