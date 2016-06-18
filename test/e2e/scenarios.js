describe('Client Angular Voting-App', function() {
  var homePolls = element.all(by.repeater('homeCtrl.polls'));
  var userPolls = element.all(by.repeater('mypollsCtrl.polls'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  })

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Poll City');
  });

  describe('Polls', function() {
    it('should be able to view a poll', () => {
      expect(homePolls.first().click()
            .element(by.binding('pollCtrl.poll.name')).getText()).toEqual('Hello');

    });
  }); //End Signup/Login


}); //End Main Describe
