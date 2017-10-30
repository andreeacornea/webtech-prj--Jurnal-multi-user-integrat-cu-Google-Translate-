# webtech-prj--Jurnal-multi-user-integrat-cu-Google-Translate-

Proiectul va presupune realizarea unei aplicatii web pentru jurnal utilizator, integrat cu Google Translate.

Se va realiza autentificarea utilizatorului prin user si parola, dupa care acesta va gasi atat lista cu notele adaugate in jurnal pana acum, cat si un editor de text in care poate adauga o noua nota de jurnal sau poate modifica o nota existenta. 

Acest editor de text va fi caracterizat de patru componente: nume nota, data nota, continut si traducere, care vor fi tratate separat prin componente specifice.

Lista in care se regasesc totalitatea notelor de jurnal va fi prezentata sub forma nume/data, iar prin accesarea unei note se poate realiza actualizarea acesteia sau traducerea intr-o alta limba (prin intermediul Google Translate). 

Baza de date relationala utilizata in dezvoltarea aplicatiei va contine atat inregistrarile de autentificare ale utilizatorului (nume user, parola), cat si informatiile adaugate de fiecare user in parte( nume nota, data nota, continut, continut tradus, limba in care s-a tradus). Pentru a putea fi actualizata de fiecare data cand se va realiza o actualizare in aplicatie, se va pastra in baza de date un cod unic la nivelul fiecarei inregistrari(note adaugate) care se va incrementa automat. In cazul in care nu se va realiza traducerea notei, campurile continut(tradus) si limba(in care s-a tradus) vor ramane null in baza de date pana la actualizari ulterioare.

In cadrul etapei de adaugare/modificare nota:
-pentru componenta data nota(label) se va face selectia dintr-un calendar;
-pentru componenta nume nota(label) vom avea un text field;
-pentru componenta continut(label) vom avea un text field multi line;
-buton adaugare nota pentru actualizare lista si salvare in baza de date;
-buton actualizare nota pentru actualizare nota existenta in lista si in baza de date;

Partea de traducere va fi tratata separat:
-se va realiza traducerea intr-un text field separat prin utilizarea butonului traducere si prin selectarea limbii in care se doreste traducerea;
-in cazul in care se realizeaza traducerea(text field-urile continut + limba vor fi populate), se poate salva in baza de date.

Interactiunea utilizatorului cu aplicatia:
-aplicatia se va deschide cu tab-ul Autentificare, solicitandu-i utilizatorului sa introduca userul si parola;
-dupa autentificare, acesta va ajunge in Lista note, unde poate vizualiza notele de jurnal adaugate pana acum;
-acesta va putea oscila intre tab-ul Lista note si Adauga nota in functie de scopul utilizarii aplicatiei in acel moment;
-pentru adaugarea unei noi note de jurnal, se vor completa campurile necesare (+ campuri optionale pentru traducere in cazul in care se doreste) si se va salva in lista si in baza de date prin intermediul butonului Salveaza nota;
-utilizatorul va putea selecta o nota pe care vrea sa o vizualizeze/actualizeze/traduca; acesta va fi redirectionat in sectiunea Adauga nota, unde se vor completa automat campurile data, titlu si continut; pentru a modifica si actualiza nota de jurnal, aceasta va fi salvata cu ajutorul butonului Actualizeaza nota si se vor face actualizarile in baza de date;

