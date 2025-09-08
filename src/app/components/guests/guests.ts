import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guests',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './guests.html',
  styleUrls: ['./guests.scss']
})
export class Guests implements OnInit {

  guestsVespertino = [
    {
      foto: '/assets/guests/antonio-araujo.jpeg',
      nome: 'Antônio Araújo',
      profissao: 'Psicopedagogo'
    },
        {
      foto: '/assets/guests/danielle.jpeg',
      nome: 'Danielle Alves',
      profissao: 'Fonoaudióloga'
    },
    {
      foto: '/assets/guests/erialdo.png',
      nome: 'Erialdo Costa',
      profissao: 'Radialista'
    },

    {
      foto: '/assets/guests/fernanda.jpeg',
      nome: 'Fernanda Medeiros',
      profissao: 'Assitente Social'
    },
    {
      foto: '/assets/guests/jane.png',
      nome: 'Jane Cleide',
      profissao: 'Terapeuta Ocpacional'
    },
    {
      foto: '/assets/guests/maria.png',
      nome: 'Maria da Penha',
      profissao: 'Assistente Social'
    }
  ];

  guestsNoturno = [
    {
      foto: '/assets/guests/alissa.png',
      nome: 'Alissa Garcia',
      profissao: 'Psicopedagoga'
    },
    {
      foto: '/assets/guests/antonia-naiara.jpeg',
      nome: 'Antonia Naiara',
      profissao: 'Licenciada em Química'
    },
        {
      foto: '/assets/guests/bianca.jpeg',
      nome: 'Bianca Marques',
      profissao: 'Licenciada em Química'
    },
    {
      foto: '/assets/guests/iraneide.jpeg',
      nome: 'Iraneide Moreira ',
      profissao: 'Licenciada em Química'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Lógica de inicialização, se necessária.
  }

}