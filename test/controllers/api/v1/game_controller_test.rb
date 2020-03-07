require 'test_helper'

class Api::V1::GameControllerTest < ActionDispatch::IntegrationTest

  test 'get : /initialize_game' do
    get "/api/v1/initialize_game"
    assert_response :success
  end


  test 'get : /initialize_board' do
    get "/api/v1/initialize_board"
    assert_response :success
  end

end
