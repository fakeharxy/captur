Rails.application.routes.draw do
  scope '/api' do
    resources :notes
    post  '/notes/update_last_seen', to: 'notes#update_last_seen'
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
