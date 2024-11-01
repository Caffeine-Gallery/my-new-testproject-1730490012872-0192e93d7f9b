import Float "mo:base/Float";
import Debug "mo:base/Debug";

actor Calculator {
    public func add(x : Float, y : Float) : async Float {
        return x + y;
    };

    public func subtract(x : Float, y : Float) : async Float {
        return x - y;
    };

    public func multiply(x : Float, y : Float) : async Float {
        return x * y;
    };

    public func divide(x : Float, y : Float) : async Float {
        if (y == 0) {
            Debug.trap("Division by zero");
        };
        return x / y;
    };
}
