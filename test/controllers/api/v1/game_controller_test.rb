require 'test_helper'

class Api::V1::GameControllerTest < ActionDispatch::IntegrationTest
  include Api::V1::GameHelper

  test "should get index" do
    html = initialize_game()
    p html
    assert true
  end

end
