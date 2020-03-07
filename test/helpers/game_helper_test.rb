
class GameHelperTest < ActionView::TestCase
    include Api::V1::GameHelper
    test "should rotate the board clock-wise" do

        assert_equal [["T","G","C","U"],["A","I","E","I"],["E","S","L","K"],["L","Y","S","O"]], rotate_board([["U","I","K","O"],["C","E","L","S"],["G","I","S","Y"],["T","A","E","L"]])

    end

    test "should give neighbour's direction and time" do

        initializedGame = initialize_game()
        assert_equal true, initializedGame.key?(:time)
        assert_equal true, initializedGame.key?(:directions)

    end

    test "should validate word from baord" do

        assert_equal true , validate_word_and_its_postiton([["E","R","B","A"],["Q","A","T","Y"],["E","P","E","W"],["R","T","N","E"]],"NET")
        assert_equal true , validate_word_and_its_postiton([["E","R","B","A"],["Q","A","T","Y"],["E","P","E","W"],["R","T","N","E"]],"PET")
        assert_equal true , validate_word_and_its_postiton([["E","R","B","A"],["Q","A","T","Y"],["E","P","E","W"],["R","T","N","E"]],"RAT")
        assert_equal false , validate_word_and_its_postiton([["E","R","B","A"],["Q","A","T","Y"],["E","P","E","W"],["R","T","N","E"]],"TEMPORARY")

        #new board
        assert_equal true , validate_word_and_its_postiton([["E","E","H","T"],["R","E","K","A"],["N","O","H","Y"],["B","C","D","N"]],"BONE")
        assert_equal false , validate_word_and_its_postiton([["E","E","H","T"],["R","E","K","A"],["N","O","H","Y"],["B","C","D","N"]],"BOOM")

    end
end