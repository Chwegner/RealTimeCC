<h1>RealTimeCC</h1>
<p>RealTimeCC ist ein System zur Erfassung und Auswertung von Arbeitszeiten.</p>
<p>Das System ist im Rahmen meiner Ausbildung zum Anwendungsentwickler entstanden.</p>

<h2>Aufgabe/Zielstellung</h2>

<ul>
<li>
Entwicklung eines neuen Zeiterfassungssystems für Firma CC (fiktiver Auftraggeber)
</li>
<li>
System soll Überwachung und Auswertung des Arbeitspensums ermöglichen
</li>
<li>
Anlegen neuer Mitarbeiter (Vor-/Nachname, Position, Standort, E-Mail, Tel.)
</li>
<li>
Generierung und Speicherung von Benutzernamen und Passwort
</li>
<li>
An-/Abmeldung der Mitarbeiter zu Arbeitsbeginn/Feierabend (Erfassung Datum + Zeit)
</li>
<li>
Berechnung der Tagesarbeitsstunden
</li>
<li>
Erstellung von Zeitkonten (Speicherung Benutzername, Vor-/Nachname, An-/Abmeldezeiten,
tägliche Arbeitszeit)
</li>
<li>
Berechung von Über-/Fehlstunden am Monatsende (Ausgehend von 40 Stunden/Woche)
</li>
<li>
Statistische Auswertung von Über-/Fehlstunden
</li>
<li>
Information an Mitarbeiter bei Über-/Fehlstunden-Quote über 10%
</li>
</ul>

<h2>Umsetzung</h2>
<p>
RealTime wurde als Web-Applikation umgesetzt. Das Programm besteht aus Benutzer-
und Administrationsbereich, sowie einer Datenbank.
</p>
<b>Mitarbeiter-Bereich:</b>
<p>
Die Mitarbeiter können sich mit ihren individuellen Zugangsdaten einloggen, um in
den Benutzerbereich zu gelangen. 
<br>
Dort werden dem Mitarbeiter einige persönliche Informationen
angezeigt:
</p>

<ul>
<li>
Das Datum des letzten, von der Datenbank registrierten, Arbeitstages.
</li>
<li>
Eine Liste der Arbeitstage zu denen kein Abmeldungszeitpunkt vorliegt. Diese
Zeiten müssen vom Administrator nachgetragen werden.
</li>
<li>
Eine Anzeige der Überstunden- bzw. Fehlstundenquote des letzten Monats,
 falls diese über 10% liegen. 
</li>
<li>
Die Uhrzeiten der An- bzw. Abmeldungen am aktuellen Arbeitstag.
</li>
</ul>

<p>
Dem Mitarbeiter wird außerdem ein Button angezeigt, der je nach Bedarf
zur morgendlichen Anmeldung, zur feierabendlichen Abmeldung 
oder zum Schließen der Seite führt.
<br>
An- und Abmeldung sind jeweils nur einmal täglich möglich.
<br>
Nach dem Betätigen des Buttons
werden die jeweiligen Uhrzeiten gespeichert und der Mitarbeiter
ausgeloggt.
</p>

<b>Administrations-Bereich:</b>
<p>
In diesen Bereich gelangt man ebenfalls durch Eingabe von
Benutzernamen und Passwort.
<br>
Über ein Menü gelangt man zu den verschiedenen Features des Bereichs:
</p>

<ul>
<li>
<b>Users:</b> Hier befindet sich ein Formular zum Anlegen neuer Mitarbeiter.
<br>
Sobald ein neuer User angelegt wurde, werden Benutzername und Passwort
generiert und in der Datenbank gespeichert.
<br>
Ausserdem kann man sich eine Liste aller gespeicherten User anzeigen
lassen und diese bearbeiten oder löschen.
</li>
<li>
<b>Standorte:</b> Alle registrierten Standorte werden aufgelistet. Hier
kann man Standorte anlegen, bearbeiten oder löschen.
</li>
<li>
<b>Positionen:</b> Alle registrierten Positionen werden aufgelistet. Auch hier 
kann man Positionen anlegen, bearbeiten oder löschen.
</li>
<li>
<b>Zeitkonten:</b> Über ein Dropdown-Menü kann ein Mitarbeiter, anhand von
User-ID, Vor- und Nachname, ausgewählt werden. 
<br>
Im nächsten Dropdown-Menü kann man die vorhandenen Monate (Monat/Jahr) 
auswählen, zu denen Arbeitstage registriert sind.
<br>
Daraufhin wird eine Liste aller registrierten Arbeitstage für den jeweiligen
Monat angezeigt. 
<br>
Die Liste enthält zu jedem Arbeitstag die Uhrzeiten der An-/Abmeldungen 
und die daraus errechnete Arbeitszeit.
<br>
Darüber hinaus werden die Über-/Fehlstundenquoten des Monats angezeigt.
</li>
<b>Logout:</b> Der Administrator wird abgemeldet und es erscheint der
Login-Bereich.
</li>
</ul>

<b>Datenbank:</b>
<p>
Hier sind folgende Tabellen enthalten:
</p>
<ul>
<li>
<b>admin:</b> Benutzername und Passwort der Administratoren
</li>
<li>
<b>positionen:</b> Positionen bzw. Aufgaben
</li>
<li>
<b>standorte:</b> Alle gespeicherten Standorte
</li>
<li>
<b>userdaten:</b> Vorname, Nachname, Position, Standort, Telefon, Mail, Username, Passwort
</li>
<li>
<b>zeitkonten:</b> User-ID (aus den Userdaten), Datum (des Arbeitstages), 
Anmelde- und Abmeldezeiten
</li>
</ul>

<h2>Was ich gelernt habe:</h2>
<ul>
<li>
Programmierung mit JavaScript/TypeScript
</li>
<li>
Umgang mit NodeJS - Installation/Benutzung von Modulen
</li>
<li>
Anlegen eines Webservers mit ExpressJS und BodyParser - Routing, Middleware
</li>
<li>
Nutzung von Template-Engines mit EJS (Embedded JavaScript templates)
</li>
<li>
Datenbankanbindung und -nutzung MySQL zu NodeJS
</li>
</ul>

<h2>Technik/Abhängigkeiten</h2>

<a href="https://github.com/nodejs/node">Node.js</a> 10.15.0
<br>
<a href="https://github.com/expressjs/express">Express.js</a> 4.16.4
<br>
<a href="https://github.com/moment/moment">Moment.js</a> 2.24.0
<br>
<a href="https://github.com/mysqljs/mysql">MySQL</a> 2.16.0
<br>
<a href="https://github.com/mde/ejs">EJS</a> 2.6.1
<br>
