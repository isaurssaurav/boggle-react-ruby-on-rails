Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'game/index'
      get 'game/initialize_board'
      get 'game/initialize_game'
      post 'game/submit_word'
      post 'game/rotate_board'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
