describe('Client Angular Voting-App', function() {
  var homePolls = element.all(by.repeater('homeCtrl.polls'));
  var userPolls = element.all(by.repeater('mypollsCtrl.polls'));
  var pollTitle = element(by.binding('pollCtrl.poll.name'));

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:8080');
    // browser.waitForAngular();
  })

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Poll City');
  });


  it('should be able to view a poll', () => {
    homePolls.first().click();
    expect(browser.getLocationAbsUrl()).toEqual('/pollview');
  });

  it('should be able to create new user', () => {
    element(by.buttonText('SignUp')).click();
    element(by.model('newUser.name')).sendKeys('Jim29');
    element(by.model('newUser.password')).sendKeys('password');
    element(by.buttonText('Sign Up')).click();
    browser.sleep(1000);
    expect(browser.getLocationAbsUrl()).toEqual('/');
  });

  it('should login a user', () => {
    element(by.model('user.username')).sendKeys('Jim29');
    element(by.model('user.password')).sendKeys('password');
    element(by.buttonText('Login')).click();
    browser.sleep(1000);
    expect(element(by.linkText('Logout')).getText()).toEqual('Logout');
  });

  it('should be able to view a user\'s polls', () => {
    element(by.linkText('My Polls')).click();
    browser.sleep(1000);
    expect(element(by.css('p')).getText()).toEqual('No polls. Create some!');
  });

  it('should be able to create a new poll', () => {
    element(by.linkText('New Polls')).click();
    element(by.model('poll.name')).sendKeys('Test');
    element(by.model('poll.options')).sendKeys('One');
    element(by.buttonText('Submit')).click();
    browser.sleep(1000);
    expect(browser.getLocationAbsUrl()).toEqual('/mypolls');
    expect(userPolls.last().element(by.binding('poll.name')).getText()).toEqual('Test');

  });

  it('should delete a user\'s poll', () => {
    element(by.linkText('My Polls')).click();
    browser.sleep(1000);
    element(by.buttonText('Delete')).click();
    browser.sleep(1000);
    expect(element(by.css('p')).getText()).toEqual('No polls. Create some!');
  })


}); //End Main Describe
