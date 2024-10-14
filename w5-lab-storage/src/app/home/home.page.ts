import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonTextarea } from '@ionic/angular/standalone';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonTextarea, IonicStorageModule, FormsModule],
  providers: [Storage]
})
export class HomePage {
  private storage = inject(Storage);
  key: string = '';
  value: string = '';
  output: string = '';

  constructor() {}

  async ngOnInit() {
    await this.storage.create();
  }

  async setItem() {
    await this.storage.set(this.key, this.value);
    this.output = `Set ${this.key}: ${this.value}`;
  }

  async getItem() {
    const value = await this.storage.get(this.key);
    this.output = `Get ${this.key}: ${value}`;
  }

  async removeItem() {
    await this.storage.remove(this.key);
    this.output = `Removed ${this.key}`;
  }

  async clearStorage() {
    await this.storage.clear();
    this.output = 'Cleared all items';
  }

  async getKeys() {
    const keys = await this.storage.keys();
    this.output = `Stored keys: ${keys.join(', ')}`;
  }

  async getLength() {
    const length = await this.storage.length();
    this.output = `Number of key/value pairs: ${length}`;
  }

  async enumerateItems() {
    let result = '';
    await this.storage.forEach((value, key, index) => {
      result += `Key: ${key}, Value: ${value}, Index: ${index}\n`;
    });
    this.output = result;
  }
}
