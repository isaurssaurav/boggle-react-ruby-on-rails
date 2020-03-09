# Boggle - React Ruby On Rails
Boggle is a word search game in which players try to find as many words as possible using adjacent letters in a limited time

## Demo
![boggle game](https://raw.githubusercontent.com/isaurssaurav/boggle-react-ruby-on-rails/master/app/assets/images/demo2.gif)

## Installation 
```sh
$ git clone https://github.com/isaurssaurav/boggle-react-ruby-on-rails.git
$ cd boggle-react-ruby-on-rails
$ bundle install
$ yarn
```
## Usage
```sh
$ rails s
```
Point your browser to `http://localhost:3000`. By default on port `3000`.

## Test
```sh
$ rails test -v
```
## Tech

* Ruby - 2.6.1
* Rails - ~> 6.0.2
* React + Typescript 

## Note
Uses [https://developer.oxforddictionaries.com/](https://developer.oxforddictionaries.com/)'s api to find if word is correct or not.

## Brief
- When game starts, new 4x4 board is generated.
- User can type `or click a cube` to make words which they think they found.
- System does validation and adds valid words into a list.
- Systems keeps track of scores, the score is total number of characters in the word.
- If word is invalid an error is displayed.
- When timer (default 2 minutes) runs out user can no longer enter new words, but should see results.


