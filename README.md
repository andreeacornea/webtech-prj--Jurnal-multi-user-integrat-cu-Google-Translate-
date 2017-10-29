# webtech-prj--Jurnal-multi-user-integrat-cu-Google-Translate-

Proiectul va presupune realizarea unei aplicatii web pentru jurnal utilizator, integrat cu Google Translate.

Se va realiza autentificarea utilizatorului prin user si parola, dupa care acesta va gasi atat lista cu notele adaugate in jurnal pana acum, cat si un editor de text in care poate adauga o noua nota de jurnal. 

Acest editor de text va fi caracterizat de patru componente: nume nota, data nota, continut si traducere, care vor fi tratate separat prin componente specifice.

Lista in care se regasesc totalitatea notelor de jurnal le va prezenta sub forma nume/data, iar prin accesarea unei note se poate realiza actualizarea acesteia sau traducerea intr-o alta limba (prin intermediul Google Translate). 

Baza de date relationala utilizata in dezvoltarea aplicatiei va contine atat inregistrarile de autentificare ale utilizatorului (nume user, parola), cat si informatiile adaugate de fiecare user in parte( nume nota, data nota, continut). Acestea va putea fi actualizata de fiecare data cand se va realiza o actualizare in aplicatie.

In cadrul etapei de adaugare/modificare nota:
-pentru componenta data nota(label) se va face selectia dintr-un calendar;
-pentru componenta nume nota(label) vom avea un text field;
-pentru componenta continut(label) vom avea un text field multi line;
-buton adaugare nota pentru actualizare lista si salvare in baza de date;

Partea de traducere va fi tratata separat:
-se va realiza traducerea intr-un text field separat prin utilizarea butonului traducere;
-in cazul in care se doreste adaugarea acesteia in baza de date, va trebui sa se salveze nota continand informatia tradusa.


