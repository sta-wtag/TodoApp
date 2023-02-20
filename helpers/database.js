import { createClient } from '@supabase/supabase-js';

export default class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.supabase = createClient(process.env.BASE_URL, process.env.KEY);

    Database.instance = this;
  }
}
